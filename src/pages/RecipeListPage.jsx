import { Box, VStack, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from "react";
import { data } from "../utils/data";
import { SearchBar } from "../components/SearchBar";
import { RecipeCard } from "../components/RecipeCard";
import { DietFilter } from "../components/DietFilter";

export const RecipeListPage = ({ onSelectRecipe }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [dietFilters, setDietFilters] = useState([]);

	const filteredRecipes = data.hits.filter(({ recipe }) => {
		const matchesSearch = recipe.label.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesDiet =
			dietFilters.length === 0 ||
			dietFilters.some((filter) =>
				recipe.healthLabels
					?.map((healthLabel) => healthLabel.toLowerCase())
					.includes(filter.toLowerCase())
			);

		return matchesSearch && matchesDiet;
	});

	return (
		<Box
			p={8}
			bg="rgb(244, 171, 106)">
			<VStack
				spacing={6}
				maxW="75rem"
				mx="auto">
				<Heading
					mb={8}
					textAlign="center">
					Recipe Collection
				</Heading>

				<SearchBar
					value={searchQuery}
					onChange={setSearchQuery}
				/>
				<DietFilter
					activeFilters={dietFilters}
					onFilterChange={setDietFilters}
				/>

				<SimpleGrid
					columns={{ base: 1, md: 2, lg: 5 }}
					spacing={{ base: 3, md: 4, lg: 5 }}>
					{filteredRecipes.length > 0 ? (
						filteredRecipes.map(({ recipe }, index) => (
							<RecipeCard
								key={`${recipe.label}-${index}`} // no unique id present in the api
								recipe={recipe}
								onSelectRecipe={onSelectRecipe}
							/>
						))
					) : (
						<Box
							gridColumn="1 / -1"
							textAlign="center">
							<Text fontSize="xl">No recipes found</Text>
						</Box>
					)}
				</SimpleGrid>
			</VStack>
		</Box>
	);
};
