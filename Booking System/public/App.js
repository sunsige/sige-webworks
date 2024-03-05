"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
/*Q1. JS Variable needs to be created here. 
Below variable is just an example. Try to add more attributes.*/
var initialTravellers = [{
  id: "1",
  name: 'Jack',
  phone: 88885555,
  bookingTime: new Date()
}, {
  id: "2",
  name: 'Rose',
  phone: 88884444,
  bookingTime: new Date()
}];
function TravellerRow(props) {
  // Q3. Placeholder to initialize local variable based on traveller prop.
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, props.traveller.id), /*#__PURE__*/React.createElement("td", null, props.traveller.name), /*#__PURE__*/React.createElement("td", null, props.traveller.phone), /*#__PURE__*/React.createElement("td", null, props.traveller.bookingTime.toString()));
}
function Display(props) {
  // Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.
  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Phone"), /*#__PURE__*/React.createElement("th", null, "Booking Time"))), /*#__PURE__*/React.createElement("tbody", null, props.travellers.map(function (traveller) {
    return /*#__PURE__*/React.createElement(TravellerRow, {
      key: traveller.id,
      traveller: traveller
    });
  })));
}
var Add = /*#__PURE__*/function (_React$Component) {
  _inherits(Add, _React$Component);
  function Add() {
    var _this;
    _classCallCheck(this, Add);
    _this = _callSuper(this, Add);
    _this.state = {
      error: ''
    };
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(Add, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      // Q4. Fetch the passenger details from the add form and call bookTraveller()
      var name = e.target.travellerName.value;
      var id = e.target.travellerID.value;
      var phone = e.target.contactNo.value;

      // Check if there are already 10 travellers
      if (this.props.travellers.length >= 10) {
        this.setState({
          error: 'Train is full!'
        });
        return;
      }

      // Check if the same traveller already has a booking
      var isExistingTraveller = this.props.travellers.some(function (traveller) {
        return traveller.name === name;
      });
      if (isExistingTraveller) {
        this.setState({
          error: 'You already have a booking!'
        });
        return;
      }

      // Add the new traveller
      this.props.bookTraveller({
        id: id,
        name: name,
        phone: phone,
        bookingTime: new Date()
      });

      // Reset the form and error message
      e.target.reset();
      this.setState({
        error: ''
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
        name: "addTraveller",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "travellerName",
        placeholder: "Name",
        required: true
      }), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "travellerID",
        placeholder: "ID",
        required: true
      }), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "contactNo",
        placeholder: "Contact No.",
        required: true
      }), /*#__PURE__*/React.createElement("button", null, "Add")), this.state.error && /*#__PURE__*/React.createElement("p", null, this.state.error));
    }
  }]);
  return Add;
}(React.Component);
var Delete = /*#__PURE__*/function (_React$Component2) {
  _inherits(Delete, _React$Component2);
  function Delete() {
    var _this2;
    _classCallCheck(this, Delete);
    _this2 = _callSuper(this, Delete);
    _this2.state = {
      error: ''
    };
    _this2.handleSubmit = _this2.handleSubmit.bind(_assertThisInitialized(_this2));
    return _this2;
  }
  _createClass(Delete, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      // Q5. Fetch the passenger details from the deletion form and call deleteTraveller()
      var name = e.target.travellerName.value;
      var id = e.target.travellerID.value;

      // Check if the traveller exists
      var isExistingTraveller = this.props.travellers.some(function (traveller) {
        return traveller.name === name && traveller.id === id;
      });
      if (!isExistingTraveller) {
        this.setState({
          error: 'You do not have a booking!'
        });
        return;
      }

      // Delete the traveller
      this.props.deleteTraveller(name);

      // Reset the form and error message
      e.target.reset();
      this.setState({
        error: ''
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
        name: "deleteTraveller",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "travellerName",
        placeholder: "Name",
        required: true
      }), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "travellerID",
        placeholder: "ID",
        required: true
      }), /*#__PURE__*/React.createElement("button", null, "Delete")), this.state.error && /*#__PURE__*/React.createElement("p", null, this.state.error));
    }
  }]);
  return Delete;
}(React.Component);
var Homepage = /*#__PURE__*/function (_React$Component3) {
  _inherits(Homepage, _React$Component3);
  function Homepage() {
    var _this3;
    _classCallCheck(this, Homepage);
    _this3 = _callSuper(this, Homepage);
    _this3.state = {
      freeSeats: 10 // Assuming 10 free seats initially
    };
    return _this3;
  }
  _createClass(Homepage, [{
    key: "render",
    value: function render() {
      var travellers = this.props.travellers;
      var totalSeats = 10; // Total number of seats
      var takenSeats = travellers.length; // Number of seats taken
      var freeSeats = totalSeats - takenSeats; // Number of free seats

      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Welcome to the Singapore-Thailand High-Speed Railway"), /*#__PURE__*/React.createElement("p", null, "Number of Free Seats: ", freeSeats), /*#__PURE__*/React.createElement("div", null, _toConsumableArray(Array(totalSeats)).map(function (_, index) {
        return /*#__PURE__*/React.createElement("div", {
          key: index,
          style: {
            width: '50px',
            height: '50px',
            backgroundColor: index < takenSeats ? 'orange' : 'green',
            display: 'inline-block',
            margin: '5px'
          }
        });
      })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'inline-block',
          marginRight: '10px'
        }
      }, "Orange: Taken"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'inline-block'
        }
      }, "Green: Available")));
    }
  }]);
  return Homepage;
}(React.Component);
var TicketToRide = /*#__PURE__*/function (_React$Component4) {
  _inherits(TicketToRide, _React$Component4);
  function TicketToRide() {
    var _this4;
    _classCallCheck(this, TicketToRide);
    _this4 = _callSuper(this, TicketToRide);
    _this4.state = {
      travellers: [],
      selector: 1
    };
    _this4.bookTraveller = _this4.bookTraveller.bind(_assertThisInitialized(_this4));
    _this4.deleteTraveller = _this4.deleteTraveller.bind(_assertThisInitialized(_this4));
    return _this4;
  }
  _createClass(TicketToRide, [{
    key: "setSelector",
    value: function setSelector(value) {
      // Q2. Function to set the value of component selector variable based on user's button click.
      this.setState({
        selector: value
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      console.log(this.state.travellers);
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this5 = this;
      setTimeout(function () {
        _this5.setState({
          travellers: initialTravellers
        });
      }, 500);
    }
  }, {
    key: "bookTraveller",
    value: function bookTraveller(passenger) {
      // Q4. Write code to add a passenger to the traveller state variable.
      var updatedTravellers = [].concat(_toConsumableArray(this.state.travellers), [passenger]);
      this.setState({
        travellers: updatedTravellers
      });
    }
  }, {
    key: "deleteTraveller",
    value: function deleteTraveller(name) {
      // Q5. Write code to delete a passenger from the traveller state variable.
      var updatedTravellers = this.state.travellers.filter(function (traveller) {
        return traveller.name !== name;
      });
      this.setState({
        travellers: updatedTravellers
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Ticket To Ride"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return _this6.setSelector(1);
        }
      }, "Home"), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return _this6.setSelector(2);
        }
      }, "Add Traveller"), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return _this6.setSelector(3);
        }
      }, "Delete Traveller"), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return _this6.setSelector(4);
        }
      }, "Display Travellers")), /*#__PURE__*/React.createElement("div", null, this.state.selector === 1 && /*#__PURE__*/React.createElement(Homepage, {
        travellers: this.state.travellers
      }), this.state.selector === 2 && /*#__PURE__*/React.createElement(Add, {
        bookTraveller: this.bookTraveller,
        travellers: this.state.travellers
      }), this.state.selector === 3 && /*#__PURE__*/React.createElement(Delete, {
        deleteTraveller: this.deleteTraveller,
        travellers: this.state.travellers
      }), this.state.selector === 4 && /*#__PURE__*/React.createElement(Display, {
        travellers: this.state.travellers
      })));
    }
  }]);
  return TicketToRide;
}(React.Component);
var element = /*#__PURE__*/React.createElement(TicketToRide, null);
ReactDOM.render(element, document.getElementById('contents'));