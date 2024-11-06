import { Box, Flex } from '@chakra-ui/react';

import { CalendarForm } from './components/CalendarForm.tsx';
import { CalendarNotification } from './components/CalendarNotification.tsx';
import { CalendarSearch } from './components/CalendarSearch.tsx';
import { CalendarView } from './components/CalendarView.tsx';
import { useEventForm } from './hooks/useEventForm.ts';
import { useEventOperations } from './hooks/useEventOperations.ts';
import { DialogProvider } from './providers/DialogProvider.tsx';

function App() {
  const { editingEvent, setEditingEvent, editEvent } = useEventForm();

  const { events, saveEvent, deleteEvent } = useEventOperations(Boolean(editingEvent), () =>
    setEditingEvent(null)
  );

  return (
    <DialogProvider>
      <Box w="full" h="100vh" m="auto" p={5}>
        <Flex gap={6} h="full">
          <CalendarForm events={events} editingEvent={editingEvent} saveEvent={saveEvent} />

          <CalendarView events={events} />

          <CalendarSearch events={events} editEvent={editEvent} deleteEvent={deleteEvent} />
        </Flex>

        <CalendarNotification events={events} />
      </Box>
    </DialogProvider>
  );
}

export default App;
