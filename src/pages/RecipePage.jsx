import { useEffect } from "react";
import {
	Box,
	Heading,
	Image,
	Text,
	Button,
	VStack,
	HStack,
	Flex,
	Tag,
	Divider,
	SimpleGrid,
} from "@chakra-ui/react";
import { ArrowBackIcon, TimeIcon } from "@chakra-ui/icons";

export const RecipePage = ({ recipe, onBack }) => {
	if (!recipe) return null;

	const {
		label,
		image,
		mealType,
		dishType,
		totalTime,
		dietLabels = [],
		healthLabels = [],
		cautions = [],
		ingredients = [],
		yield: servings,
		totalNutrients = {},
	} = recipe;

	// Helper function to format nutrient values
	const getNutrient = (key, label) => {
		const nutrient = totalNutrients[key];
		if (!nutrient) return null;
		return (
			<Box
				key={key}
				w="100%"
				display="flex"
				justifyContent="space-between"
			>
				<Text>{label}:</Text>
				<Text fontWeight="bold">
					{Math.round(nutrient.quantity)} {nutrient.unit}
				</Text>
			</Box>
		);
	};

	// Scroll to top of page when using keyboard navigation
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// Handle backspace key to navigate back
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Backspace") {
				e.preventDefault();
				onBack();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [onBack]);

	return (
		<Box
			position="relative"
			w="100%"
			p={8}
			bg="rgb(244, 171, 106)"
			minH="100vh"
		>
			<Button
				position="absolute"
				top={8}
				left={8}
				leftIcon={<ArrowBackIcon />}
				onClick={onBack}
				colorScheme="orange"
				role="button"
				tabIndex={0}
				zIndex={1}
				aria-label="Back to recipes"
			>
				Back to recipes
			</Button>

			<VStack
				spacing={3}
				maxW="75rem"
				mx="auto"
			>
				<Image
					src={image}
					alt={label}
					borderRadius="lg"
					objectFit="cover"
					w="100%"
					maxH="20rem"
				/>

				{/* Grid Layout */}
				<SimpleGrid
					columns={{ base: 1, md: 2 }}
					gap={3}
					w="100%"
					bg="rgb(255, 223, 191)"
					p={4}
					borderRadius="lg"
					boxShadow="md"
				>
					{/* Left Column */}
					<Box>
						<VStack
							align="start"
							spacing={4}
						>
							<Box>
								<Heading
									size="lg"
									mb={2}
								>
									{label}
								</Heading>
								<Text
									color="gray.600"
									fontSize="sm"
								>
									{mealType}
								</Text>
								<Text
									color="gray.600"
									fontSize="lg"
									mb={1}
								>
									{dishType}
								</Text>

								<HStack>
									<TimeIcon />
									<Text>{totalTime} minutes</Text>
								</HStack>
								<Text>Servings: {servings}</Text>
							</Box>

							<Divider my={2} />

							<Box w="100%">
								<Heading
									size="md"
									mb={2}
								>
									Ingredients
								</Heading>
								<VStack align="start">
									{ingredients.map((ingredient, index) => (
										<Text key={index}>• {ingredient.text}</Text>
									))}
								</VStack>
							</Box>
						</VStack>
					</Box>

					{/* Right Column */}
					<Box>
						<VStack align="start">
							{/* Diet Labels */}
							{dietLabels.length > 0 && (
								<Box w="100%">
									<Text
										fontWeight="bold"
										mb={2}
									>
										Diet Labels:
									</Text>
									<Flex
										gap={2}
										wrap="wrap"
									>
										{dietLabels.map((label, index) => (
											<Tag
												key={index}
												colorScheme="blue"
											>
												{label}
											</Tag>
										))}
									</Flex>
								</Box>
							)}

							{/* Health Labels */}
							{healthLabels.length > 0 && (
								<Box w="100%">
									<Text
										fontWeight="bold"
										mb={2}
									>
										Health Labels:
									</Text>
									<Flex
										gap={2}
										wrap="wrap"
									>
										{healthLabels.slice(0, 10).map((label, index) => (
											<Tag
												key={index}
												colorScheme="green"
												size="sm"
											>
												{label}
											</Tag>
										))}
									</Flex>
								</Box>
							)}

							{/* Cautions */}
							{cautions.length > 0 && (
								<Box w="100%">
									<Text
										fontWeight="bold"
										mb={2}
									>
										Cautions:
									</Text>
									<Flex
										gap={2}
										wrap="wrap"
									>
										{cautions.map((caution, index) => (
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

							{/* Nutrition Facts */}
							<Box
								w="100%"
								pt={4}
							>
								<Text
									fontWeight="bold"
									mb={2}
								>
									Nutrition Facts (per serving):
								</Text>
								<VStack
									align="stretch"
									spacing={1}
								>
									{getNutrient("ENERC_KCAL", "Energy")}
									{getNutrient("PROCNT", "Protein")}
									{getNutrient("FAT", "Total Fat")}
									{getNutrient("CHOCDF", "Carbohydrates")}
									{getNutrient("CHOLE", "Cholesterol")}
									{getNutrient("NA", "Sodium")}
								</VStack>
							</Box>
						</VStack>
					</Box>
				</SimpleGrid>
			</VStack>
		</Box>
	);
};
