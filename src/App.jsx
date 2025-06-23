import { useState, Suspense, lazy } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import { RecipeListPage } from "./pages/RecipeListPage";

// Lazy load the RecipePage component
const RecipePage = lazy(() => import("./pages/RecipePage"));

export const App = () => {
	const [selectedRecipe, setSelectedRecipe] = useState(null);

	return (
		<Box
			minH="100vh"
			minW="320px">
			{/* minW is for mobile devices */}
			<Suspense
				fallback={
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						h="100vh">
						<Spinner size="xl" />
					</Box>
				}>
				{selectedRecipe ? (
					<RecipePage
						recipe={selectedRecipe}
						onBack={() => setSelectedRecipe(null)}
					/>
				) : (
					<RecipeListPage onSelectRecipe={setSelectedRecipe} />
				)}
			</Suspense>
		</Box>
	);
};
