import {
	Box,
	Heading,
	Image,
	Text,
	Tag,
	VStack,
	SimpleGrid,
	Flex,
} from "@chakra-ui/react";
import { data } from "../utils/data";

export const RecipeListPage = ({ onSelectRecipe }) => {
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
			<SimpleGrid
				columns={{ base: 1, md: 2, lg: 3 }}
				spacing={{ base: 4, md: 6, lg: 8 }} // grid-gap
			>
				{data.hits.map((hit, index) => {
					const recipe = hit.recipe;
					const hasDietLabels =
						recipe.dietLabels && recipe.dietLabels.length > 0;
					const hasCautions = recipe.cautions && recipe.cautions.length > 0;
					const isVegan = recipe.healthLabels.includes("Vegan");
					const isVegetarian = recipe.healthLabels.includes("Vegetarian");
					const isGlutenFree = recipe.healthLabels.includes("Gluten-Free");
					const isDairyFree = recipe.healthLabels.includes("Dairy-Free");

					return (
						<Box
							key={`${recipe.label}-${index}`} // no ID present in the API
							border="none"
							borderWidth="1px"
							borderRadius="lg"
							overflow="hidden"
							bg="rgb(255, 223, 191)"
							p={4}
							cursor="pointer"
							// onClick={() => onSelectRecipe(recipe)}
							transition="transform 0.2s ease-in-out"
							_hover={{
								transform: "scale(1.02)",
							}}
						>
							<VStack
								spacing={2}
								align="start"
							>
								<Image
									src={recipe.image}
									alt={recipe.label}
									objectFit="cover"
									objectPosition="center"
									boxSize="20rem"
									borderRadius="md"
									alignSelf="center"
								/>
								<Heading size="md">{recipe.label}</Heading>

								{hasDietLabels && (
									<Box>
										<Text fontWeight="bold">Diet:</Text>
										<Flex
											gap={2}
											flexWrap="wrap"
											mt={1}
										>
											{recipe.dietLabels.map((label, index) => (
												<Tag
													key={index}
													colorScheme="blue"
													size="sm"
												>
													{label}
												</Tag>
											))}
										</Flex>
									</Box>
								)}

								{hasCautions && (
									<Box>
										<Text fontWeight="bold">Cautions:</Text>
										<Flex
											gap={2}
											flexWrap="wrap"
											mt={1}
										>
											{recipe.cautions.map((caution, i) => (
												<Tag
													key={i}
													colorScheme="red"
													size="sm"
												>
													{caution}
												</Tag>
											))}
										</Flex>
									</Box>
								)}

								<Box>
									<Text>
										<strong>Meal Type:</strong> {recipe.mealType}
									</Text>
									<Text>
										<strong>Dish Type:</strong> {recipe.dishType}
									</Text>
								</Box>

								<Flex
									gap={2}
									flexWrap="wrap"
									mt={2}
								>
									{isVegan && <Tag colorScheme="green">Vegan</Tag>}
									{isVegetarian && <Tag colorScheme="teal">Vegetarian</Tag>}
									{isGlutenFree && <Tag colorScheme="orange">Gluten-Free</Tag>}
									{isDairyFree && <Tag colorScheme="yellow">Dairy-Free</Tag>}
								</Flex>
							</VStack>
						</Box>
					);
				})}
			</SimpleGrid>
		</Box>
	);
};
