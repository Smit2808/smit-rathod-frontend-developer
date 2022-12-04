//import logo from './logo.svg';
import './App.css';
//import axios from 'axios';
import { Component, useEffect, useState } from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

class App extends Component {

  constructor(){
    super();

    this.state = {
      capsules: [],
      selectedStatus: "",
      selectedLanding: "",
      filteredCapsules: [],
      selectedType: "",
      searchFieldValue: "",
    }
    
  }

  componentDidMount() {
    fetch("https://api.spacexdata.com/v3/capsules")
    .then((response) => response.json())
    .then(capsules => this.setState({capsules: capsules}))
  }


  render() {
    const statusValues = [...new Set(this.state.capsules.map((data) => data.status))];
    const landingValues = [...new Set(this.state.capsules.map((data) => data.landings))];
    const typeValues = [...new Set(this.state.capsules.map((data) => data.type))];
    const onSearchChange = (e) => {
      this.setState({searchFieldValue: e.target.value});
    }
    const onStatusChange = (e) => {
      this.setState({selectedStatus: e.target.value});
    }
    const onLandingFilterChange = (e) => {
      this.setState({selectedLanding: e.target.value});
    }
    const onTypeFilterChange = (e) => {
      this.setState({selectedType: e.target.value});
    }
    //console.log(this.state.selectedStatus);
    const onSubmitButton = () => {
      console.log(this.state.selectedStatus);
      console.log(this.state.selectedLanding);
      const filteredValues = this.state.capsules.filter((capsules) => capsules.status == (this.state.selectedStatus == "" ? capsules.status : this.state.selectedStatus ))
      .filter((capsules) => capsules.landings == (this.state.selectedLanding == "" ? capsules.landings : this.state.selectedLanding ))
      .filter((capsules) => capsules.type == (this.state.selectedType == "" ? capsules.type : this.state.selectedType ))
      .filter((capsules) => capsules.capsule_serial == (this.state.searchFieldValue == "" ? capsules.capsule_serial : this.state.searchFieldValue ))
      this.setState({filteredCapsules: filteredValues});
    }
    return (
      <div className="spacex-app">
        <h2>test</h2>
        <div className='spacex-data-wrapper'>
          <div className='search-and-filter-wrapper'>
            <div className='search-wrapper'>
              <input type="text" id="search-field" onChange={onSearchChange}/>
            </div>
            <div className='filter-wrapper'>
              <div className='status-filter-wrapper'>
                <select className='status-filter' onChange={onStatusChange}>
                  <option value="">Select Status</option>
                  {statusValues.map((data) => (<option value={data} key={data}>{data}</option>))}
                </select>
              </div>
              <div className='landings-filter-wrapper'>
                <select className='landings-filter' onChange={onLandingFilterChange}>
                  <option value="">Select Landing</option>
                  {landingValues.map((data) => (<option value={data} key={data}>{data}</option>))}
                </select>
              </div>
              <div className='types-filter-wrapper'>
                <select className='types-filter' onChange={onTypeFilterChange}>
                  <option value="">Select Type</option>
                  {typeValues.map((data) => (<option value={data} key={data}>{data}</option>))}
                </select>
              </div>
              <button className='btn btn-success' onClick={onSubmitButton}>Search</button>
            </div>
          </div>
          {console.log(this.state.filteredCapsules)}
          {((!this.state.filteredCapsules.length) ? this.state.capsules : this.state.filteredCapsules).map((data) => (
          <div key={data.capsule_serial}>
            <h2>{data.capsule_serial}</h2>
            <h4>{data.status}</h4>
            <h4>{data.landings}</h4>
            <h4>{data.type}</h4>
          </div>))}
        </div>
      </div>
    );
  }
}

export default App;
