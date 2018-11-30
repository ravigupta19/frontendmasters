import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };

  static getDerivedStateFromProps({ media }) {
    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }

    return { photos };
  }

  handleIndexClick = event => {
    this.setState({
      active: +event.target.dataset.index
    });
  };

  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active].value} alt="Primary Animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => {
            return (
              /* eslint-disable-next-line*/
              <img
                key={photo.value}
                data-index={index}
                src={photo.value}
                className={index === active ? "active" : ""}
                alt="animal thumbnail"
                onClick={this.handleIndexClick}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Carousel;
