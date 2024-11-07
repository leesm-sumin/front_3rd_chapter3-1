import { ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';

import { CalendarSearch } from '../../components/CalendarSearch';
import { CalendarViewHookProvider } from '../../providers/CalendarViewHookProvider';
import { Event } from '../../types';

describe('CalendarSearch', () => {
  const events: Event[] = [
    {
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
    },
    {
      id: '2',
      title: '이벤트 2',
      date: '2024-10-05',
      startTime: '13:00',
      endTime: '14:00',
      description: '행사 2',
      location: '인천',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
    {
      id: '3',
      title: '이벤트 3',
      date: '2024-10-09',
      startTime: '15:00',
      endTime: '16:00',
      description: '행사 3',
      location: '대구',
      category: '업무',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 10,
    },
    {
      id: '4',
      title: '이벤트 4',
      date: '2024-10-23',
      startTime: '17:00',
      endTime: '18:00',
      description: '행사 4',
      location: '부산',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
    {
      id: '5',
      title: '이벤트 5',
      date: '2024-10-31',
      startTime: '19:00',
      endTime: '20:00',
      description: '행사 5',
      location: '광주',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
  ];

  const editEvent = vi.fn();
  const deleteEvent = vi.fn();

  it('검색어를 입력하지 않은 상태에서는 해당 뷰의 이벤트를 모두 표시한다.', () => {
    render(
      <ChakraProvider>
        <CalendarViewHookProvider>
          <CalendarSearch events={events} editEvent={editEvent} deleteEvent={deleteEvent} />
        </CalendarViewHookProvider>
      </ChakraProvider>
    );

    expect(screen.getByTestId('event-list')).toBeInTheDocument();

    expect(screen.getByRole('group')).toHaveTextContent('일정 검색');
    expect(screen.getByPlaceholderText('검색어를 입력하세요')).toBeInTheDocument();

    expect(screen.getAllByText(/이벤트/, { exact: false })).toHaveLength(events.length);
  });

  it('검색어를 입력하면 해당 이벤트만 표시한다.', () => {
    render(
      <ChakraProvider>
        <CalendarViewHookProvider>
          <CalendarSearch events={events} editEvent={() => {}} deleteEvent={deleteEvent} />
        </CalendarViewHookProvider>
      </ChakraProvider>
    );

    const input = screen.getByPlaceholderText('검색어를 입력하세요');

    fireEvent.change(input, { target: { value: '이벤트 1' } });

    expect(screen.getByText('이벤트 1')).toBeInTheDocument();
  });

  it('해당 뷰에 검색 결과가 없을 때 검색 결과가 없다는 메시지를 표시한다.', () => {
    vi.setSystemTime('2024-09-01');

    render(
      <ChakraProvider>
        <CalendarViewHookProvider>
          <CalendarSearch events={events} editEvent={() => {}} deleteEvent={deleteEvent} />
        </CalendarViewHookProvider>
      </ChakraProvider>
    );

    expect(screen.getByText('검색 결과가 없습니다.')).toBeInTheDocument();
  });
});
