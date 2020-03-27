import React from 'react';
import { Link } from 'react-router-dom';
import Recipes from './Recipes';

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = { recipe: { ingredients: "" } };

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ recipe: response }))
      .catch(() => this.props.history.push("/recipe"));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  render() {
    const { recipe } = this.state;
    let ingredientList = "No ingredients avaiable";

    if (recipe.ingredients.length > 0 ) {
      ingredientList = recipe.ingredients
        .split(",")
        .map((ingredient, index) => (
          <li key ={index} className = "">
            {ingredient}
          </li>
        ));
    }
    const recipeInstruction = this.addHtmlEntities(recipe.instruction);

    return (
      <div className ="">
        <div className =""> 
          <img
            src ={recipe.image}
            alt ={`${recipe.name} image`}
            className =""
          />  

          <div className ="" />
          <h1 className ="">
            {recipe.name}
          </h1>
        </div>
        <div className ="">
          <div className ="">
            <div className ="">
              <ul className ="">
                <h5 className ="">ingredients</h5>
                {ingredientList}
              </ul>
            </div>
            <div className ="">
              <h5 className ="">instructions</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${recipeInstruction}`
                }}
              />  
            </div>
            <div className = "">
              <button type ="button" className ="">
                Delete Recipe
              </button>
            </div>
          </div>
          <Link to ="/recipes" className ="">
            Back to recipes
          </Link>
        </div>
      </div>
    );
  }

}

export default Recipe;