import { Box, VStack, HStack, Image, Text, Heading, Tag, Flex } from "@chakra-ui/react";

export const RecipeCard = ({ recipe, onSelectRecipe }) => {
	const hasDietLabels = recipe.dietLabels?.length > 0;
	const hasCautions = recipe.cautions?.length > 0;
	const isVegan = recipe.healthLabels?.includes("Vegan");
	const isVegetarian = recipe.healthLabels?.includes("Vegetarian");
	const isGlutenFree = recipe.healthLabels?.includes("Gluten-Free");
	const isDairyFree = recipe.healthLabels?.includes("Dairy-Free");

	const handleKeyDown = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onSelectRecipe(recipe);
		}
	};

	return (
		<Box
			as="article"
			overflow="hidden"
			borderRadius="lg"
			bg="rgb(255, 223, 191)"
			p={2}
			cursor="pointer"
			onClick={() => onSelectRecipe(recipe)}
			onKeyDown={handleKeyDown}
			role="button"
			tabIndex={0}
			aria-label={`View recipe for ${recipe.label}`}
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
					h="15rem"
					objectFit="cover"
					objectPosition="center"
					borderRadius="lg"
				/>
				<HStack
					justifyContent="center"
					wrap="wrap"
					spacing={2}
					textAlign="center"
				>
					{recipe.mealType.map((mealType, index) => (
						<Text
							color="gray.600"
							key={index}
							_after={index < recipe.mealType.length - 1 ? { content: `","` } : null}
						>
							{mealType}
						</Text>
					))}
				</HStack>
				<Heading
					size="md"
					textAlign="center"
				>
					{recipe.label}
				</Heading>
				<HStack>
					<Text
						as="span"
						fontWeight="bold"
						fontSize="xs"
					>
						Dish Type:
					</Text>
					{recipe.dishType.map((dishType, index) => (
						<Text key={index}>{dishType}</Text>
					))}
				</HStack>

				{hasDietLabels && (
					<Box>
						<Text
							fontWeight="bold"
							fontSize="xs"
						>
							Diet:
						</Text>
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
						<Text
							fontWeight="bold"
							fontSize="xs"
						>
							Cautions:
						</Text>
						<Flex
							gap={2}
							flexWrap="wrap"
							mt={1}
						>
							{recipe.cautions.map((caution, index) => (
								<Tag
									key={index}
									colorScheme="red"
									size="sm"
								>
									{caution}
								</Tag>
							))}
						</Flex>
					</Box>
				)}

				{(isVegan || isVegetarian || isGlutenFree || isDairyFree) && (
					<>
						<Text
							fontWeight="bold"
							fontSize="xs"
						>
							Health Labels:
						</Text>
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
					</>
				)}
			</VStack>
		</Box>
	);
};
