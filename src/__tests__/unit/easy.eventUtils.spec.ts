import { Event } from '../../types';
import { getFilteredEvents } from '../../utils/eventUtils';

describe('getFilteredEvents', () => {
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
      date: '2024-09-01',
      startTime: '19:00',
      endTime: '20:00',
      description: '행사 6',
      location: '제주',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
  ];

  it("검색어 '이벤트 2'에 맞는 이벤트만 반환한다", () => {
    expect(getFilteredEvents(events, '이벤트 2', new Date('2024-07-01'), 'month')).toEqual([
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
    ]);
  });

  it('주간 뷰에서 2024-07-01 주의 이벤트만 반환한다', () => {
    expect(getFilteredEvents(events, '이벤트', new Date('2024-07-01'), 'week')).toEqual([
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
    ]);
  });

  it('월간 뷰에서 2024년 7월의 모든 이벤트를 반환한다', () => {
    expect(getFilteredEvents(events, '이벤트', new Date('2024-07-01'), 'month')).toEqual([
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
    ]);
  });

  it("검색어 '이벤트'와 주간 뷰 필터링을 동시에 적용한다", () => {
    expect(getFilteredEvents(events, '이벤트', new Date('2024-07-01'), 'week')).toEqual([
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
    ]);
  });

  it('검색어가 없을 때 모든 이벤트를 반환한다', () => {
    expect(getFilteredEvents(events, '', new Date('2024-07-01'), 'week')).toEqual([
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
    ]);
  });

  it('검색어가 대소문자를 구분하지 않고 작동한다', () => {
    expect(getFilteredEvents(events, 'event', new Date('2024-08-01'), 'month')).toEqual([
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
    ]);
  });

  it('월의 경계에 있는 이벤트를 올바르게 필터링한다', () => {
    expect(getFilteredEvents(events, 'event', new Date('2024-08-31'), 'month')).toEqual([
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
    ]);
  });

  it('빈 이벤트 리스트에 대해 빈 배열을 반환한다', () => {
    expect(getFilteredEvents([], '이벤트', new Date(), 'week')).toEqual([]);
  });
});
