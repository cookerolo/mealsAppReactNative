class Meal {
  constructor(
    id,
    categoriyIds,
    title,
    affordability,
    complexity,
    imageUrl,
    duration,
    ingredients,
    steps,
    isGlutenFree,
    isVegan,
    isVegeterian,
    isLactoseFree
  ) {
    this.id = id;
    this.categoriyIds = categoriyIds;
    this.title = title;
    this.affordability = affordability;
    this.complexity = complexity;
    this.imageUrl = imageUrl;
    this.duration = duration;
    this.ingredients = ingredients;
    this.steps = steps;
    this.isGlutenFree = isGlutenFree;
    this.isVegan = isVegan;
    this.isVegeterian = isVegeterian;
    this.isLactoseFree = isLactoseFree;
  }
}
export default Meal;
