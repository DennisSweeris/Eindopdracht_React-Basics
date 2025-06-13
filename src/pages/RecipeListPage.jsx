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
				columns={{ base: 1, md: 2, lg: 4 }}
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
							as="article"
							key={`${recipe.label}-${index}`} // no ID present in the API
							overflow="hidden"
							borderRadius="lg"
							bg="rgb(255, 223, 191)"
							p={2}
							cursor="pointer"
							onClick={() => onSelectRecipe(recipe)}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									onSelectRecipe(recipe);
								}
							}}
							role="button"
							tabIndex={0}
							aria-label={`Bekijk recept voor ${recipe.label}`}
							transition="all 0.2s ease-in-out"
							_hover={{
								transform: "scale(1.02)",
								shadow: "md",
							}}
							_focus={{
								transform: "scale(1.02)",
								shadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
								outline: "none",
							}}
						>
							<VStack
								spacing={2}
								align="stretch"
							>
								<Image
									src={recipe.image}
									alt={recipe.label}
									w="100%"
									h="20rem"
									objectFit="cover"
									objectPosition="center"
									borderTopRadius="lg"
								/>
								<Text
									textAlign="center"
									w="100%"
									color="gray.600"
								>
									{recipe.mealType}
								</Text>
								<Heading
									size="md"
									textAlign="center"
									w="100%"
								>
									{recipe.label}
								</Heading>
								<Box>
									<Text>
										<Text
											as="span"
											fontWeight="bold"
										>
											Dish Type:{" "}
										</Text>
										{recipe.dishType}
									</Text>
								</Box>

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
