import { Flex } from '@chakra-ui/react'
import './App.css'
import { DroppableSection } from './components/atoms/DroppableSection'
import { useState } from 'react'
import { DndContext, rectIntersection } from '@dnd-kit/core'
import { InsertTask } from './components/atoms/InsertTask'

interface Card {
  id: string
  title: string
}

function App() {
    const [todoItems, setTodoItems] = useState<Card[]>([
      { id: '1', title: 'Task 1' },
      { id: '2', title: 'Task 2' },
      { id: '3', title: 'Task 3' },
    ])

    const [ongoingItems, setOngoingItems] = useState<Card[]>([
      { id: '4', title: 'Task 4' },
      { id: '5', title: 'Task 5' },
      { id: '6', title: 'Task 6' },
    ])

    const [doneItems, setDoneItems] = useState<Card[]>([
      { id: '7', title: 'Task 7' },
      { id: '8', title: 'Task 8' },
      { id: '9', title: 'Task 9' },
    ])

    // Function to add a card to a specific section
    function addToSection(section: string, card: Card) {
      switch(section) {
        case 'Todo':
          setTodoItems([...todoItems, card]);
          break;
        case 'Ongoing':
          setOngoingItems([...ongoingItems, card]);
          break;
        case 'Done':
          setDoneItems( [...doneItems, card]);
          break;
        default:
          break;
      }
    }

    // Function to remove a card from a specific section
    function removeFromSection(section: string, cardId: string){
      switch (section) {
        case 'Todo':
          setTodoItems(todoItems.filter(item => item.id !== cardId));
          break;
        case 'Ongoing':
          setOngoingItems(ongoingItems.filter(item => item.id !== cardId));
          break;
        case 'Done':
          setDoneItems(doneItems.filter(item => item.id !== cardId));
          break;
        default:
          break;
      }
    }

    function onAddTodo(title: string, section: string, id: string) {
      addToSection(section, { id: id, title: title });
    }

    return (
      <DndContext
        onDragEnd={(e) => {
          console.log(e);
          const currSection = e.over?.id; // where the drag ended
          const cardId = e.active?.data?.current?.id; // which card is being dragged
          const cardTitle = e.active?.data?.current?.title;
          const prevSection = e.active?.data?.current?.section;

          // If the task is dropped outside any valid section, do nothing
          if (!currSection) {
            return;
          }

          // Check if the card is being dropped into a valid section
          if(currSection === prevSection) { return; }
      
          // Remove the card from its previous section
          removeFromSection(prevSection, cardId);

          // Add the card to its new section
          addToSection(currSection.toString(), { id: cardId, title: cardTitle });

        }}
        collisionDetection={rectIntersection}
      >
        <InsertTask onAddTask={onAddTodo} />
        <Flex flexDirection={"column"}>
          <Flex flex={"3"}>
            <DroppableSection title="Todo" items={todoItems}/>
            <DroppableSection title="Ongoing" items={ongoingItems}/>
            <DroppableSection title="Done" items={doneItems}/>
          </Flex>
        </Flex>
      </DndContext>
    )
  }

export default App
