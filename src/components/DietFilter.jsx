import { HStack, Tag, TagLabel, TagCloseButton, Select, Box } from "@chakra-ui/react";
import { data } from "../utils/data";

// Quick filter options
const COMMON_DIETS = ["Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free", "Pescatarian"].sort(
	(a, b) => a.localeCompare(b)
);

// Get all unique health labels from the data
const getAllHealthLabels = () => {
	const labels = new Set();
	data.hits.forEach((hit) => {
		hit.recipe.healthLabels?.forEach((label) => {
			if (!COMMON_DIETS.includes(label)) {
				labels.add(label);
			}
		});
	});
	return [...labels].sort();
};

export const DietFilter = ({ activeFilters = [], onFilterChange }) => {
	const allHealthLabels = getAllHealthLabels();

	const toggleFilter = (diet) => {
		if (activeFilters.includes(diet)) {
			onFilterChange(activeFilters.filter((filter) => filter !== diet));
		} else {
			onFilterChange([...activeFilters, diet]);
		}
	};

	const handleSelectChange = (e) => {
		const selectedDiet = e.target.value;
		if (selectedDiet && !activeFilters.includes(selectedDiet)) {
			onFilterChange([...activeFilters, selectedDiet]);
		}
		e.target.value = "";
	};

	const handleKeyDown = (e, diet) => {
		if (e.key === "Enter") {
			e.preventDefault();
			toggleFilter(diet);
		}
	};

	const handleClose = (e, diet) => {
		e.stopPropagation();
		onFilterChange(activeFilters.filter((filter) => filter !== diet));
	};

	// Combine common diets and active filters for display
	const allDisplayedDiets = [...new Set([...COMMON_DIETS, ...activeFilters])];

	return (
		<Box>
			{/* Dropdown to add more filters */}
			<Box
				mb={4}
				display="flex"
				justifyContent="center">
				<Select
					placeholder="Add diet filter..."
					size="sm"
					width="15rem"
					onChange={handleSelectChange}
					value=""
					variant="outline"
					title="Add diet filter"
					aria-label="Add diet filter"
					_hover={{ cursor: "pointer", borderColor: "blue.500" }}>
					{allHealthLabels
						.filter((label) => !activeFilters.includes(label))
						.map((label) => (
							<option
								key={label}
								value={label}>
								{label}
							</option>
						))}
				</Select>
			</Box>

			{/* Common diets and active filters */}
			<HStack
				spacing={2}
				flexWrap="wrap"
				gap={2}
				justifyContent="center">
				{allDisplayedDiets.map((diet) => {
					const isActive = activeFilters.includes(diet);
					return (
						<Tag
							key={diet}
							size="md"
							variant={isActive ? "solid" : "subtle"}
							colorScheme="blue"
							cursor="pointer"
							wrap="wrap"
							onClick={() => toggleFilter(diet)}
							onKeyDown={(e) => handleKeyDown(e, diet)}
							tabIndex={0}
							aria-label={`Filter by ${diet}`}
							transition="all 0.2s ease-in-out"
							boxShadow="md"
							_hover={{ opacity: isActive ? 1 : 0.8, transform: "translateY(-2px)" }}>
							<TagLabel>{diet}</TagLabel>
							{isActive && (
								<TagCloseButton
									onClick={(e) => handleClose(e, diet)}
									aria-label={`Remove ${diet} filter`}
								/>
							)}
						</Tag>
					);
				})}
			</HStack>
		</Box>
	);
};
