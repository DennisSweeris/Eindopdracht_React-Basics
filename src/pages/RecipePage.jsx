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
				py={1}
			>
				<Text>{label}:</Text>
				<Text fontWeight="bold">
					{Math.round(nutrient.quantity)} {nutrient.unit}
				</Text>
			</Box>
		);
	};

	return (
		<Box
			p={8}
			bg="rgb(244, 171, 106)"
			minH="100vh"
		>
			<Button
				leftIcon={<ArrowBackIcon />}
				onClick={onBack}
				mb={6}
				colorScheme="orange"
			>
				Back to recipes
			</Button>

			<VStack
				spacing={6}
				maxW="1200px"
				mx="auto"
			>
				{/* Recipe Image */}
				<Image
					src={image}
					alt={label}
					borderRadius="lg"
					objectFit="cover"
					w="100%"
					maxH="400px"
				/>

				{/* Two Column Layout */}
				<Flex
					direction={["column", "row"]}
					gap={8}
					w="100%"
					bg="white"
					p={6}
					borderRadius="lg"
					boxShadow="md"
				>
					{/* Left Column */}
					<Box flex={1}>
						<VStack
							align="start"
							spacing={4}
						>
							<Box>
								<Text
									color="gray.600"
									fontSize="lg"
								>
									{mealType} {dishType}
								</Text>
								<Heading
									size="xl"
									mb={2}
								>
									{label}
								</Heading>

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
									mb={4}
								>
									Ingredients
								</Heading>
								<VStack
									align="start"
									spacing={2}
								>
									{ingredients.map((ingredient, index) => (
										<Text key={index}>• {ingredient.text}</Text>
									))}
								</VStack>
							</Box>
						</VStack>
					</Box>

					{/* Right Column */}
					<Box flex={1}>
						<VStack
							align="start"
							spacing={4}
						>
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
				</Flex>
			</VStack>
		</Box>
	);
};
