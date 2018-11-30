import React from "react";
import pf from "petfinder-client";
import { navigate } from "@reach/router";

const petfinder = pf({
  key: process.env.API_KEY,
  secretL: process.env.API_SECRET
});

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    petfinder.pet
      .get({
        output: "full",
        id: this.props.id
      })
      .then(data => {
        const pet = data.petfinder.pet;
        let breed;
        if (Array.isArray(data.petfinder.pet.breeds.breed)) {
          breed = data.petfinder.pet.breeds.breed.join(", ");
        } else {
          breed = data.petfinder.pet.breeds.breed;
        }

        this.setState({
          name: pet.name,
          location: `${pet.contact.state} - ${pet.contact.city}`,
          description: pet.description,
          media: pet.media,
          breed,
          animal: pet.animal,
          loading: false
        });
      })
      .catch(() => {
        navigate("/");
      });
  }

  render() {
    if (this.state.loading) {
      return <h2>Loading ....</h2>;
    }
    const { animal, breed, location, media, name, description } = this.state;

    return (
      <div className="deatils">
        <h1>{name}</h1>
        <h2>
          {animal} - {breed} - {location}
        </h2>
        <p>{description}</p>
      </div>
    );
  }
}

export default Details;
