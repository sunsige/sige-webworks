/*Q1. JS Variable needs to be created here. 
Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: "1",
    name: 'Jack',
    phone: 88885555,
    bookingTime: new Date(),
  },
  {
    id: "2",
    name: 'Rose',
    phone: 88884444,
    bookingTime: new Date(),
  },
];

function TravellerRow(props) {
  // Q3. Placeholder to initialize local variable based on traveller prop.
  return (
    <tr>
      {/* Q3. Placeholder for rendering one row of a table with required traveller attribute values. */}
      <td>{props.traveller.id}</td>
      <td>{props.traveller.name}</td>
      <td>{props.traveller.phone}</td>
      <td>{props.traveller.bookingTime.toString()}</td>
    </tr>
  );
}

function Display(props) {
  // Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          {/* Q3. Below table is just an example. Add more columns based on the traveller attributes you choose. */}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
        </tr>
      </thead>
      <tbody>
        {/* Q3. write code to call the JS variable defined at the top of this function to render table rows. */}
        {props.travellers.map(traveller => (
          <TravellerRow key={traveller.id} traveller={traveller} />
        ))}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.state = {
      error: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // Q4. Fetch the passenger details from the add form and call bookTraveller()
    const name = e.target.travellerName.value;
    const id = e.target.travellerID.value;
    const phone = e.target.contactNo.value;

    // Check if there are already 10 travellers
    if (this.props.travellers.length >= 10) {
      this.setState({ error: 'Train is full!' });
      return;
    }

    // Check if the same traveller already has a booking
    const isExistingTraveller = this.props.travellers.some(traveller => traveller.name === name);
    if (isExistingTraveller) {
      this.setState({ error: 'You already have a booking!' });
      return;
    }

    // Add the new traveller
    this.props.bookTraveller({ id: id, name: name, phone: phone, bookingTime: new Date() });

    // Reset the form and error message
    e.target.reset();
    this.setState({ error: '' });
  }

  render() {
    return (
      <div>
        <form name="addTraveller" onSubmit={this.handleSubmit}>
          {/* Q4. Placeholder to enter passenger details. Below code is just an example. */}
          <input type="text" name="travellerName" placeholder="Name" required />
          <input type="text" name="travellerID" placeholder="ID" required />
          <input type="text" name="contactNo" placeholder="Contact No." required />
          <button>Add</button>
        </form>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

class Delete extends React.Component {
  constructor() {
    super();
    this.state = {
      error: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // Q5. Fetch the passenger details from the deletion form and call deleteTraveller()
    const name = e.target.travellerName.value;
    const id = e.target.travellerID.value;

    // Check if the traveller exists
    const isExistingTraveller = this.props.travellers.some(traveller => traveller.name === name && traveller.id === id);
    if (!isExistingTraveller) {
      this.setState({ error: 'You do not have a booking!' });
      return;
    }

    // Delete the traveller
    this.props.deleteTraveller(name);

    // Reset the form and error message
    e.target.reset();
    this.setState({ error: '' });
  }

  render() {
    return (
      <div>
        <form name="deleteTraveller" onSubmit={this.handleSubmit}>
          {/* Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example. */}
          <input type="text" name="travellerName" placeholder="Name" required />
          <input type="text" name="travellerID" placeholder="ID" required />
          <button>Delete</button>
        </form>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      freeSeats: 10 // Assuming 10 free seats initially
    };
  }

  render() {
    const { travellers } = this.props;
    const totalSeats = 10; // Total number of seats
    const takenSeats = travellers.length; // Number of seats taken
    const freeSeats = totalSeats - takenSeats; // Number of free seats

    return (
      <div>
        {/* Q2. Placeholder for Homepage code that shows free seats visually. */}
        <h2>Welcome to the Singapore-Thailand High-Speed Railway</h2>
        <p>Number of Free Seats: {freeSeats}</p>
        <div>
          {/* Display seats */}
          {[...Array(totalSeats)].map((_, index) => (
            <div
              key={index}
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: index < takenSeats ? 'orange' : 'green',
                display: 'inline-block',
                margin: '5px',
              }}
            ></div>
          ))}
        </div>
        <div>
          {/* Legend */}
          <div style={{ display: 'inline-block', marginRight: '10px' }}>Orange: Taken</div>
          <div style={{ display: 'inline-block' }}>Green: Available</div>
        </div>
      </div>
    );
  }
}

class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1 };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  setSelector(value) {
    // Q2. Function to set the value of component selector variable based on user's button click.
    this.setState({ selector: value });
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    console.log(this.state.travellers);
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
    // Q4. Write code to add a passenger to the traveller state variable.
    const updatedTravellers = [...this.state.travellers, passenger];
    this.setState({ travellers: updatedTravellers });
  }

  deleteTraveller(name) {
    // Q5. Write code to delete a passenger from the traveller state variable.
    const updatedTravellers = this.state.travellers.filter(traveller => traveller.name !== name);
    this.setState({ travellers: updatedTravellers });
  }

  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
        <div>
          <button onClick={() => this.setSelector(1)}>Home</button>
          <button onClick={() => this.setSelector(2)}>Add Traveller</button>
          <button onClick={() => this.setSelector(3)}>Delete Traveller</button>
          <button onClick={() => this.setSelector(4)}>Display Travellers</button>
        </div>
        <div>
          {this.state.selector === 1 && <Homepage travellers={this.state.travellers} />}
          {this.state.selector === 2 && <Add bookTraveller={this.bookTraveller} travellers={this.state.travellers} />}
          {this.state.selector === 3 && <Delete deleteTraveller={this.deleteTraveller} travellers={this.state.travellers} />}
          {this.state.selector === 4 && <Display travellers={this.state.travellers} />}
        </div>
      </div>
    );
  }
}


const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
