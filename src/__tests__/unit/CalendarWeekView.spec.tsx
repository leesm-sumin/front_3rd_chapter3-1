import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';

import { CalendarWeekView } from '../../components/CalendarWeekView';
import { Event } from '../../types';

describe('CalendarWeekView', () => {
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
      title: 'Event 4',
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
      title: 'event 5',
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
  const currentDate = new Date('2024-10-01');

  beforeEach(() => {
    render(
      <ChakraProvider>
        <CalendarWeekView events={events} currentDate={currentDate} />
      </ChakraProvider>
    );
  });

  it('주간 뷰를 올바르게 표시한다.', () => {
    // 주간 뷰 컴포넌트가 존재하는지 확인
    expect(screen.getByTestId('week-view')).toBeInTheDocument();

    // 주간 뷰 헤더에 주 정보가 존재하는지 확인
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('2024년 10월 1주');

    // 주간 뷰 내에 이벤트가 존재하는지 확인
    expect(screen.queryByText('이벤트 1')).toBeInTheDocument();
    expect(screen.queryByText('이벤트 2')).toBeInTheDocument();

    // 주간 뷰 내에 해당 주에 포함되지 않는 이벤트 미표시 확인
    expect(screen.queryByText('이벤트 3')).not.toBeInTheDocument();
    expect(screen.queryByText('Event 4')).not.toBeInTheDocument();
    expect(screen.queryByText('event 5')).not.toBeInTheDocument();
  });

  it('해당 주의 공휴일은 미표시한다.', () => {
    expect(screen.queryByText('개천절')).not.toBeInTheDocument();
  });
});
