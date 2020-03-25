import React from 'react';
import { Link } from 'react-router-dom';

class Recipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    const url = "api/v1/recipes/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ recipes: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    const { recipes } = this.state;
    const allRecipe = recipes.map((recipe, index) => (
      <div key={index} className="">
        <div className="">
          <img
          src={recipe.image}
          className="card-img-top"
          alt={`${recipe.name} image`}  
          />
          <div>
            <h5 className="">{recipe.name}</h5>
            <Link to={`/recipe/${recipe.id}`} className="">
              View Recipe
            </Link>
          </div>
        </div>
      </div>
    ));

    const noRecipe = (
      <div className="">
        <h4 className="">
          No recipes yet. Why not <Link to="/new_recipe"></Link>
        </h4>
      </div>
    );

    return(
      <>
        <section className="">
          <div className="">
            <h1 className=""></h1>
            <p className="">
              We've pulled together our most popular recipes, our latest additions, 
              and our editor's picks, so there's sure to be something tempting for 
              you to try.
            </p>
          </div>
        </section>
        <div className="">
          <main className="">
            <div className="">
              <Link to="/recipe" className="">
                Create New Recipe
              </Link>
            </div>
            <div className=""> 
              {recipes.length > 0 ? allRecipe : noRecipe}
            </div>
            <Link to="/" className="">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }

}

export default Recipes;