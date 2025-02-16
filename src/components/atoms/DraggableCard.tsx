import { Flex, Text } from "@chakra-ui/react"
import { useDraggable } from "@dnd-kit/core"
import { useEffect } from "react"
import { CSS } from '@dnd-kit/utilities'

interface DraggableCardProps {
    title: string
    id: string 
    section: string
}

export const DraggableCard : React.FC<DraggableCardProps> = ({
    title,
    id,
    section
}) => {

    const {isDragging, setNodeRef, attributes, listeners, transform} = useDraggable({
        id: id,
        data: {
            title: title,
            section: section,
            id: id
        }
    })

    useEffect(() => {
        console.log("dragging status", isDragging)
    }, [isDragging]);

    return (
            <Flex
              p={4}
              m={3}
              bg="white"
              transform={CSS.Translate.toString(transform)}
              boxShadow="md"
              borderRadius="md"
              ref={setNodeRef}
              {...listeners}
              {...attributes}
              align="center"
              justify="center"
              cursor="grab"
              _hover={{ boxShadow: "lg" }}
            >
                <Text
                    color={"gray.800"}
                >
                    {title}
                </Text>
            </Flex>
    )
}
