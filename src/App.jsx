import { useState } from "react";
import { RecipeListPage } from "./pages/RecipeListPage";
import { RecipePage } from "./pages/RecipePage";

export const App = () => {
	const [selectedRecipe, setSelectedRecipe] = useState(null);

	return selectedRecipe ? (
		<RecipePage
			recipe={selectedRecipe}
			onBack={() => setSelectedRecipe(null)}
		/>
	) : (
		<RecipeListPage onSelectRecipe={setSelectedRecipe} />
	);
};
