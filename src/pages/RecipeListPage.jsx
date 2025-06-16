import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from "react";
import { data } from "../utils/data";
import { SearchBar } from "../components/SearchBar";
import { RecipeCard } from "../components/RecipeCard";

export const RecipeListPage = ({ onSelectRecipe }) => {
	const [searchQuery, setSearchQuery] = useState("");

	const filteredRecipes = data.hits.filter((hit) => {
		const matchesSearch = hit.recipe.label.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesSearch;
	});

	return (
		<Box
			p={8}
			bg="rgb(244, 171, 106)"
		>
			<Heading
				mb={8}
				textAlign="center"
			>
				Recipe Collection
			</Heading>

			<SearchBar
				value={searchQuery}
				onChange={setSearchQuery}
			/>

			<SimpleGrid
				columns={{ base: 1, md: 2, lg: 5 }}
				spacing={{ base: 3, md: 4, lg: 5 }}
			>
				{filteredRecipes.length > 0 ? (
					filteredRecipes.map(({ recipe }, index) => (
						<RecipeCard
							key={`${recipe.label}-${index}`}
							recipe={recipe}
							onSelectRecipe={onSelectRecipe}
						/>
					))
				) : (
					<Box
						gridColumn="1 / -1"
						textAlign="center"
					>
						<Text fontSize="xl">No recipes found</Text>
					</Box>
				)}
			</SimpleGrid>
		</Box>
	);
};
