import { Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const SearchBar = ({ value, onChange }) => {
	return (
		<InputGroup
			size="lg"
			w="clamp(200px, 50%, 600px)"
			mx="auto"
			mb={4}
		>
			<InputLeftElement pointerEvents="none">
				<Icon
					as={SearchIcon}
					color="gray.400"
				/>
			</InputLeftElement>
			<Input
				type="text"
				placeholder="Search recipes..."
				value={value}
				onChange={(e) => onChange(e.target.value)}
				bg="white"
				borderColor="gray.200"
				_focus={{
					shadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
					outline: "none",
				}}
			/>
		</InputGroup>
	);
};
