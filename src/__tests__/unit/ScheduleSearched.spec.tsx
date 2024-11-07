import { ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { ScheduleSearched } from '../../components/ScheduleSearched';
import { Event } from '../../types';

describe('ScheduleSearched', () => {
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

  const deleteEvent = vi.fn();
  const editEvent = vi.fn();

  it('일정을 표시한다.', () => {
    render(
      <ChakraProvider>
        <ScheduleSearched
          event={event}
          isNotified={false}
          editEvent={editEvent}
          deleteEvent={deleteEvent}
        />
      </ChakraProvider>
    );

    expect(screen.getByText('이벤트 1')).toBeInTheDocument();
    expect(screen.getByText('2024-10-01')).toBeInTheDocument();
    expect(screen.getByText('09:00 - 10:00')).toBeInTheDocument();
    expect(screen.getByText('행사 1')).toBeInTheDocument();
    expect(screen.getByText('서울')).toBeInTheDocument();
    expect(screen.getByText('카테고리: 업무')).toBeInTheDocument();
    expect(screen.getByText('알림: 10분 전')).toBeInTheDocument();
  });

  it('알림이 표시된 일정을 표시한다.', () => {
    const { container } = render(
      <ChakraProvider>
        <ScheduleSearched
          event={event}
          isNotified={true}
          editEvent={editEvent}
          deleteEvent={deleteEvent}
        />
      </ChakraProvider>
    );

    expect(container.querySelector('.chakra-icon.css-onkibi')).toBeInTheDocument();
  });

  it('일정 삭제 버튼 클릭시 삭제 함수가 호출된다.', () => {
    render(
      <ChakraProvider>
        <ScheduleSearched
          event={event}
          isNotified={false}
          editEvent={editEvent}
          deleteEvent={deleteEvent}
        />
      </ChakraProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Delete event' }));

    expect(deleteEvent).toHaveBeenCalledWith(event.id);
  });

  it('일정 편집 버튼 클릭시 편집 함수가 호출된다.', () => {
    render(
      <ChakraProvider>
        <ScheduleSearched
          event={event}
          isNotified={false}
          editEvent={editEvent}
          deleteEvent={deleteEvent}
        />
      </ChakraProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Edit event' }));

    expect(editEvent).toHaveBeenCalled();
  });
});
