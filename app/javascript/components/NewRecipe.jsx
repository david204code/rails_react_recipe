import React from 'react';
import { Link } from 'react-router-dom';

class NewRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      ingredients: "",
      instruction: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/recipes/create";
    const { name, ingredients, instruction } = this.state;

    if (name.length == 0 || ingredients.length == 0 || instruction.length == 0)
      return;

    const body = {
      name,
      ingredients,
      instruction: instruction.replace(/\n/g, "<br> <br>")
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.props.history.push(`/recipe/${response.id}`))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <div className = "">
        <div className = "">
          <div className = "">
            <h1>
              Add a new recipe to our awesome recipe collection.
            </h1>
            <form onSubmit ={this.onSubmit}>
              <div className ="">
                <label htmlFor="recipeName">Recipe name</label>
                <input
                  type ="text"
                  name ="name"
                  id ="recipeName"
                  className =""
                  required
                  onChange ={this.onChange}
                />
              </div>
              <div className ="">
                <label htmlFor="recipeIngredients">Ingredients</label>
                <input
                  type ="text"
                  name ="ingredients"
                  id ="recipeIngredients"
                  className =""
                  required
                  onChange ={this.onChange}
                />
                <small id ="" className ="">
                  Seperate each ingredient with a coma.
                </small>
              </div>
              <label htmlFor="instruction">Preparation Instructions</label>
              <textarea
                className =""
                id ="instruction"
                name ="instruction"
                rows ="5"
                required
                onChange ={this.onChange}
              />
              <button type ="submit" className ="">
                Create Recipe
              </button>
              <Link to ="/recipes" className ="">
                Back to recipes
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default NewRecipe;