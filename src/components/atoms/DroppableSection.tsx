import { Flex, Text } from "@chakra-ui/react";
import { DraggableCard } from "./DraggableCard";
import { useDroppable } from "@dnd-kit/core";

interface Card {
    id: string
    title: string
}

interface DroppableSectionProps {
    title: string
    items: Card[]
}

export const DroppableSection : React.FC<DroppableSectionProps> = ({
    title,
    items
}) => {

    const {setNodeRef} = useDroppable({
        id: title
    })

    return (
        <Flex
            flexDirection="column"
            minHeight={"15rem"}
            p={5}
        >
            <Text
                fontSize="xl"
                fontWeight="bold"
                color="white"
            >
                {title}
            </Text>
            <Flex
                ref={setNodeRef}
                flexDirection="column"
                flex={"1"}
                p={2}
                borderRadius={8}
                backgroundColor={"gray.800"}
            >
                {items.map((card: Card) => (
                    <DraggableCard section={title} title={card.title} id={card.id} key={card.id}/>
                ))}
            </Flex>
        </Flex>
    );
}