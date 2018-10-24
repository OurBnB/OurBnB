import React from "react";
import "../styles/Property.scss";
import Carousel from "react-image-carousel";

const remark = require("remark");
const reactRenderer = require("remark-react");

class Property extends React.Component {
  constructor() {
    super();
    this.handleToggleDescription = this.handleToggleDescription.bind(this);
    this.state = {
      descriptionToggle: false
    };
  }

  handleToggleDescription() {
    this.setState({
      descriptionToggle: !this.state.descriptionToggle
    });
  }

  render() {
    const descriptionText = this.props.property.description;
    let images = [
      `../static/images/${this.props.property.image_1}`,
      `../static/images/${this.props.property.image_2}`,
      `../static/images/${this.props.property.image_3}`,
      `../static/images/${this.props.property.image_4}`,
      `../static/images/${this.props.property.image_5}`
    ];

    return (
      <div className="property">
        <section className="property__details">
          <h1>
            {this.props.property.bedrooms} bedroom property in{" "}
            {this.props.property.city}
          </h1>
          <div className="photo-carousel">
            <Carousel
              images={images}
              thumb={true}
              loop={true}
              autoplay={5000}
            />
          </div>
          <h2>
            {this.props.property.address_l1}, {this.props.property.address_l2}
          </h2>
          <ul>
            <li>
              <img className="icon" src="../static/images/bed.png" />
              {this.props.property.bedrooms}
            </li>
            <li>
              <img className="icon" src="../static/images/bathroom.png" />
              {this.props.property.bathrooms}
            </li>
            <li>
              <img className="icon" src="../static/images/family.png" />
              {this.props.property.can_sleep} max
            </li>
            <li>
              <img className="icon" src="../static/images/money.png" />£
              {this.props.property.price_per_night}
            </li>
          </ul>
          <button
            className="property__description__btn"
            onClick={this.handleToggleDescription}
          >
            Description
          </button>
          {this.state.descriptionToggle &&
            remark()
              .use(reactRenderer)
              .processSync(descriptionText).contents}
        </section>
        <section className="property__booking">
            <h2>Make your booking</h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
          optio architecto autem voluptatibus voluptates ea, ad nemo quasi
          corporis cum sunt quam aspernatur repudiandae ab sapiente. Non quam
          laborum illum.
        </section>
      </div>
    );
  }
}

export default Property;
