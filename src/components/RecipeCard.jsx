import { Box, VStack, HStack, Image, Text, Heading, Tag, Flex, Skeleton } from "@chakra-ui/react";
import { useState } from "react";

export const RecipeCard = ({ recipe, onSelectRecipe }) => {
	const [imageLoaded, setImageLoaded] = useState(false);

	const { image, label, mealType, dishType, dietLabels, cautions, healthLabels } = recipe;

	const hasDietLabels = dietLabels?.length > 0;
	const hasCautions = cautions?.length > 0;
	const isVegan = healthLabels?.includes("Vegan");
	const isVegetarian = healthLabels?.includes("Vegetarian");
	const isGlutenFree = healthLabels?.includes("Gluten-Free");
	const isDairyFree = healthLabels?.includes("Dairy-Free");

	const handleKeyDown = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onSelectRecipe(recipe);
		}
	};

	return (
		<Box
			as="article"
			role="article"
			overflow="hidden"
			borderRadius="lg"
			bg="rgb(255, 223, 191)"
			p={2}
			cursor="pointer"
			onClick={() => onSelectRecipe(recipe)}
			onKeyDown={handleKeyDown}
			tabIndex={0}
			aria-label={`View recipe for ${label}`}
			transition="all 0.2s ease-in-out"
			_hover={{
				transform: "scale(1.02)",
				shadow: "md",
			}}
			_focus={{
				transform: "scale(1.02)",
				shadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
				outline: "none",
			}}>
			<VStack
				spacing={2}
				align="stretch">
				<Box
					position="relative"
					h="15rem"
					borderRadius="lg"
					overflow="hidden">
					<Skeleton
						isLoaded={imageLoaded}
						width="100%"
						height="100%"
						position="absolute"
						top={0}
						left={0}
					/>
					<Image
						src={image}
						alt={label}
						w="100%"
						h="100%"
						objectFit="cover"
						objectPosition="center"
						borderRadius="lg"
						loading="lazy"
						onLoad={() => setImageLoaded(true)}
						opacity={imageLoaded ? 1 : 0}
						transition="opacity 0.3s ease-in-out"
					/>
				</Box>
				<HStack
					justifyContent="center"
					wrap="wrap"
					spacing={2}
					textAlign="center">
					{mealType.map((mealType, index) => (
						<Text
							color="gray.600"
							key={index}
							_after={index < mealType.length - 1 ? { content: `","` } : null}>
							{mealType}
						</Text>
					))}
				</HStack>
				<Heading
					size="md"
					textAlign="center">
					{label}
				</Heading>
				<HStack>
					<Text
						as="span"
						fontWeight="bold"
						fontSize="xs">
						Dish Type:
					</Text>
					{dishType.map((dishType, index) => (
						<Text key={index}>{dishType}</Text>
					))}
				</HStack>

				{hasDietLabels && (
					<Box>
						<Text
							fontWeight="bold"
							fontSize="xs">
							Diet:
						</Text>
						<Flex
							gap={2}
							flexWrap="wrap"
							mt={1}>
							{dietLabels.map((label, index) => (
								<Tag
									key={index}
									colorScheme="blue"
									size="sm">
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
							fontSize="xs">
							Cautions:
						</Text>
						<Flex
							gap={2}
							flexWrap="wrap"
							mt={1}>
							{cautions.map((caution, index) => (
								<Tag
									key={index}
									colorScheme="red"
									size="sm">
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
							fontSize="xs">
							Health Labels:
						</Text>
						<Flex
							gap={2}
							flexWrap="wrap"
							mt={2}>
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
