import { HStack, Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";

export const DietFilter = ({ activeFilters = [], onFilterChange }) => {
	const dietOptions = ["Vegan", "Vegetarian", "Pescatarian", "Gluten-Free", "Dairy-Free"];

	const toggleFilter = (diet) => {
		if (activeFilters.includes(diet)) {
			onFilterChange(activeFilters.filter((filter) => filter !== diet));
		} else {
			onFilterChange([...activeFilters, diet]);
		}
	};

	const handleKeyDown = (e, diet) => {
		if (e.key === "Enter") {
			e.preventDefault();
			toggleFilter(diet);
		}
	};

	const handleClose = (e, diet) => {
		e.stopPropagation();
		toggleFilter(diet);
	};

	return (
		<HStack spacing={2}>
			{dietOptions.map((diet) => {
				const isActive = activeFilters.includes(diet);
				return (
					<Tag
						key={diet}
						onClick={() => toggleFilter(diet)}
						onKeyDown={(e) => handleKeyDown(e, diet)}
						cursor="pointer"
						transition="all 0.2s ease-in-out"
						tabIndex={0}
						aria-label={`Filter by ${diet}`}
						_hover={{
							transform: "translateY(-2px)",
						}}
					>
						<TagLabel>{diet}</TagLabel>
						{isActive && (
							<TagCloseButton
								aria-label={`Remove ${diet} filter`}
								tabIndex={0}
								onClick={(e) => handleClose(e, diet)}
								onKeyDown={(e) => handleClose(e, diet)}
								bg={isActive ? "red.500" : "transparent"}
							/>
						)}
					</Tag>
				);
			})}
		</HStack>
	);
};
