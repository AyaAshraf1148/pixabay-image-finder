import React, { Component } from "react";
import ReactDOM from "react-dom";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import axios from "axios";
import ImageResults from "../image-results/ImageResults";

class Search extends Component {
  state = {
    searchText: "",
    amount: 15,
    apiUrl: "https://pixabay.com/api",
    apiKey: "43489022-a4596227fccb6e2b7267941e1",
    images: [],
  };

  //   onTextChange = (e) => {
  //     this.setState({ [e.target.name]: e.target.value }, () => {
  //       axios
  //         .get(
  //           `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&
  //         per_page=${this.state.amount}&safesearch=true`
  //         )
  //         .then((res) => this.setState({ images: res.data.hits }))
  //         .catch((err) => console.log(err));
  //     });
  //   };

  //   onAmountChange = (e, index, value) => {
  //     // var amount = this.state.amount
  //     this.setState({ amount: value });
  //     console.log("testValue"+ amount)
  //   };

  fetchImages = () => {
    const { apiUrl, apiKey, searchText, amount } = this.state;
    axios
      .get(
        `${apiUrl}/?key=${apiKey}&q=${searchText}&image_type=photo&per_page=${amount}&safesearch=true`
      )
      .then((res) => this.setState({ images: res.data.hits }))
      .catch((err) => console.log(err));
  };

  onTextChange = (e) => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === "") {
        this.setState({ images: [] });
      } else {
        this.fetchImages();
      }
    });
  };

  onAmountChange = (e, index, value) => {
    this.setState({ amount: value }, this.fetchImages);
  };

  render() {
    console.log(this.state.images);
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search For Images"
          fullWidth={true}
        />
        <br />
        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>
        <br />
        {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} />
        ) : null}
      </div>
    );
  }
}

export default Search;
