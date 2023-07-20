/* eslint-disable react/prop-types */
import { Card, Button, Tooltip } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Draggable, Droppable } from 'react-beautiful-dnd';

// compoents
import CardItem from './CardItem';

function TrelloList({ index, listId, title, cards, handleOpenModalAddCard, handleAddCard }) {

  return (
    <Draggable draggableId={String(listId)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='todoList'
        >
          <Droppable droppableId={String(listId)} type="CARD">
            {(provided) => (
              <div
                ref={provided.innerRef}
                // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                {...provided.droppableProps}
              >
                <Card
                  className="cardList"
                  title={title}
                  extra={
                    <>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Tooltip placement="top" title="Add a card">
                          <Button shape="circle" icon={<PlusOutlined />} onClick={handleOpenModalAddCard} />
                        </Tooltip>
                        <Tooltip placement="top" title="Delete this list">
                          <Button shape="circle" icon={<DeleteOutlined />} />
                        </Tooltip>
                      </div>
                    </>
                  }
                  style={{
                    width: 300,
                  }}
                >
                  {cards.map((card, cardIndex) => {
                    return (
                      <CardItem
                        key={card.id}
                        card={card}
                        index={cardIndex}
                        listId={listId}
                      />
                    )
                  })}

                  {provided.placeholder}
                </Card>
              </div>

            )}
          </Droppable>

        </div>
      )}
    </Draggable>

  )
}

export default TrelloList