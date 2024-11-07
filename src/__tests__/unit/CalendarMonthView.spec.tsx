import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';

import { fetchHolidays } from '../../apis/fetchHolidays';
import { CalendarMonthView } from '../../components/CalendarMonthView';
import { Event } from '../../types';

describe('CalendarMonthView', () => {
  const events: Event[] = [
    {
      id: '1',
      title: '이벤트 1',
      date: '2024-07-01',
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
      date: '2024-07-05',
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
      date: '2024-07-09',
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
      date: '2024-08-23',
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
      date: '2024-08-31',
      startTime: '19:00',
      endTime: '20:00',
      description: '행사 5',
      location: '광주',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
    {
      id: '6',
      title: 'event 6',
      date: '2024-10-01',
      startTime: '19:00',
      endTime: '20:00',
      description: '행사 6',
      location: '제주',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
  ];
  const currentDate = new Date('2024-10-01');
  const holidays = fetchHolidays(currentDate);

  beforeEach(() => {
    render(
      <ChakraProvider>
        <CalendarMonthView events={events} currentDate={currentDate} holidays={holidays} />
      </ChakraProvider>
    );
  });

  it('월간 뷰를 올바르게 표시한다.', () => {
    // 월간 뷰 컴포넌트가 존재하는지 확인
    expect(screen.getByTestId('month-view')).toBeInTheDocument();

    // 월간 뷰 헤더에 월 정보가 존재하는지 확인
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('2024년 10월');

    // 월간 뷰 내에 이벤트가 존재하는지 확인
    expect(screen.getByText('event 6')).toBeInTheDocument();

    // 월간 뷰 내에 해당 월에 포함되지 않는 이벤트 미표시 확인
    expect(screen.queryByText('이벤트 1')).not.toBeInTheDocument();
    expect(screen.queryByText('이벤트 2')).not.toBeInTheDocument();
    expect(screen.queryByText('이벤트 3')).not.toBeInTheDocument();
    expect(screen.queryByText('Event 4')).not.toBeInTheDocument();
    expect(screen.queryByText('event 5')).not.toBeInTheDocument();
  });

  it('해당 월의 공휴일에 대한 표시를 올바르게 한다.', () => {
    expect(screen.getByText('개천절')).toBeInTheDocument();
    expect(screen.getByText('한글날')).toBeInTheDocument();
  });
});
