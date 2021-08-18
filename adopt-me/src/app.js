const Pet = (props) => {
  return React.createElement('div', {}, [
    React.createElement('h2', {}, props.name),
    React.createElement('h3', {}, props.animal),
    React.createElement('h3', {}, props.breed),
  ])
}

const App = () => {
  return React.createElement(
    'div',
    {},
    [
      React.createElement('h1', {}, 'Adopt Me'),
      React.createElement(Pet, { name: "Toby", animal: "Dog", breed: "Pit Bull/Shepherd" }),
      React.createElement(Pet, { name: "Junior", animal: "Dog", breed: "Golden Retriever" }),
      React.createElement(Pet, { name: "Wormy", animal: "Dog", breed: "Heeler" }),
      React.createElement(Pet, { name: "Lola", animal: "Dog", breed: "Lab/Shepherd" }),
      React.createElement(Pet, { name: "Bear-Bear", animal: "Dog", breed: "Corgi" }),
    ]
  )
}

ReactDOM.render(React.createElement(App), document.getElementById('root'))