import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';

import { ScheduleDay } from '../../components/ScheduleDay';
import { Event } from '../../types';

describe('ScheduleDay', () => {
  const event: Event = {
    id: '1',
    title: '이벤트 1',
    date: '2024-10-01',
    startTime: '09:00',
    endTime: '10:00',
    description: '행사 1',
    location: '서울',
    category: '업무',
    repeat: {
      type: 'none',
      interval: 0,
    },
    notificationTime: 10,
  };

  it('일정을 표시한다.', () => {
    render(
      <ChakraProvider>
        <ScheduleDay event={event} isNotified={false} />
      </ChakraProvider>
    );

    expect(screen.getByText('이벤트 1')).toBeInTheDocument();
  });

  it('알림이 있을 때 아이콘을 표시한다.', () => {
    const { container } = render(
      <ChakraProvider>
        <ScheduleDay event={event} isNotified={true} />
      </ChakraProvider>
    );

    expect(container.querySelector('.chakra-icon.css-onkibi')).toBeInTheDocument();
  });
});
