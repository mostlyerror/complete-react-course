class RoomSupply
  # Returns hash map of each hotel's currently indicated room availability
  # example: { 1 => 10, 2 => 15, ... }
  def self.latest_vacancies(swap)
    avs = swap.availabilities
      .where(
        date: ([swap.start_date, swap.intake_dates.first].min)..swap.end_date, 
        created_at: Date.current.beginning_of_day..Date.current.end_of_day
      )
    Hotel.pluck(:id).reduce({}) do |memo, hotel_id|
      av = avs.select { |av| av.hotel_id == hotel_id }.first
      vacancy = av.present? ? av.vacant : 0
      memo.merge(Hash[hotel_id, vacancy])
    end
  end

  # Returns hash map of hotel id to the # of vouchers issued within the 24 hour period
  # example: { 1 => 5, 2 => 10, ... }
  def self.vouchers_issued_today(swap)
    hotel_ids = Hotel.pluck(:id)
    hotels = hotel_ids.zip(Array.new(hotel_ids.size, 0)).to_h
    vouchers = swap.vouchers
      .where(created_at: Date.current.beginning_of_day..Date.current.end_of_day)
      .group(:hotel_id)
      .count
    hotels.merge(vouchers)
  end

  # Returns hash map of hotel id to vouchers remaining (vacancies - issued)
  # example: { 1 => 2, 2 => 8, ... }
  def self.vouchers_remaining_today(swap)
    vac = self.latest_vacancies(swap)
    vou = self.vouchers_issued_today(swap)
    vac.merge(vou) { |_k, vacancies, vouchers| vacancies - vouchers }
  end

  # Total remaining vouchers 
  def self.num_vouchers_remaining_today(swap)
    vouchers_remaining_today(swap).values.reduce(:+).to_i
  end

  # Returns hash map of hotel id and vacancies/issuances for each date in the
  # swap period. If executed during the current swap period, vacant/issued data
  # will potentially still be changing for the current day.
  # 
  # example:
  # {
  #   1 => {
  #     "2021-01-01 00:00:00 -0600" => {
  #       :vacant => 10,
  #       :issued => 30
  #     },
  #     "2021-01-02 00:00:00 -0600" => {
  #       ...
  #     }
  #   }
  # }
  def self.by_hotel(swap)
    supply = Hotel.all.reduce({}) do |memo, hotel| 
      dates = swap.intake_dates.reduce({}) do |dates, day|
        dates.merge(Hash[day, {vacant: nil, issued: nil}])
      end
      memo.merge(Hash[hotel.id, dates])
    end

    vouchers = swap.vouchers
      .where(created_at: Date.current.beginning_of_day..Date.current.end_of_day)
      .group(:hotel_id)
      .count

    swap.availabilities
      .where(
        date: ([swap.start_date, swap.intake_dates.first].min)..swap.end_date,
        created_at: Date.current.beginning_of_day..Date.current.end_of_day,
      )
      .each_with_object(supply) do |av, supply|
        supply[av.hotel_id][av.date][:vacant] = av.vacant
        supply[av.hotel_id][Date.current][:issued] = vouchers[av.hotel_id].to_i
      end
  end
end