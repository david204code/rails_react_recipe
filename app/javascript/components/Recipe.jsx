import React from 'react';
import { Link } from 'react-router-dom';
import Recipes from './Recipes';

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = { recipe: { ingredients: "" } };

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
  }
}

export default Recipe;