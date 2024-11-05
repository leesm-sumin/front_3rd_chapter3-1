import { act, renderHook } from '@testing-library/react';

import { useSearch } from '../../hooks/useSearch.ts';
import { Event } from '../../types.ts';

const events: Event[] = [
  {
    id: '1',
    title: '이벤트 1',
    date: '2024-07-01',
    startTime: '14:30',
    endTime: '15:30',
    description: '오후 회의',
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
    startTime: '16:00',
    endTime: '17:00',
    description: '오후 회의',
    location: '서울',
    category: '약속',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 10,
  },
  {
    id: '3',
    title: '이벤트 3',
    date: '2024-07-09',
    startTime: '13:00',
    endTime: '14:00',
    description: '점심',
    location: '강릉',
    category: '약속',
    repeat: { type: 'none', interval: 1 },
    notificationTime: 10,
  },
  {
    id: '4',
    title: 'Event 4',
    date: '2024-08-23',
    startTime: '10:00',
    endTime: '23:00',
    description: '여행',
    location: '부산',
    category: '약속',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 10,
  },
  {
    id: '5',
    title: 'event 5',
    date: '2024-08-30',
    startTime: '10:00',
    endTime: '11:00',
    description: '회의',
    location: '서울',
    category: '업무',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 10,
  },
  {
    id: '6',
    title: 'event 6',
    date: '2024-09-01',
    startTime: '10:00',
    endTime: '11:00',
    description: '오전 회의',
    location: '서울',
    category: '업무',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 10,
  },
];

it('검색어가 비어있을 때 모든 이벤트를 반환해야 한다', () => {
  const { result } = renderHook(() => useSearch(events, new Date('2024-08-01'), 'month'));

  act(() => {
    result.current.setSearchTerm('');
  });

  expect(result.current.filteredEvents).toEqual([
    {
      id: '4',
      title: 'Event 4',
      date: '2024-08-23',
      startTime: '10:00',
      endTime: '23:00',
      description: '여행',
      location: '부산',
      category: '약속',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
    {
      id: '5',
      title: 'event 5',
      date: '2024-08-30',
      startTime: '10:00',
      endTime: '11:00',
      description: '회의',
      location: '서울',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
  ]);
});

it('검색어에 맞는 이벤트만 필터링해야 한다', () => {
  const { result } = renderHook(() => useSearch(events, new Date('2024-07-01'), 'week'));

  act(() => {
    result.current.setSearchTerm('이벤트 2');
  });

  expect(result.current.filteredEvents).toEqual([
    {
      id: '2',
      title: '이벤트 2',
      date: '2024-07-05',
      startTime: '16:00',
      endTime: '17:00',
      description: '오후 회의',
      location: '서울',
      category: '약속',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
  ]);
});

it('검색어가 제목, 설명, 위치 중 하나라도 일치하면 해당 이벤트를 반환해야 한다', () => {
  const { result } = renderHook(() => useSearch(events, new Date('2024-07-01'), 'month'));

  act(() => {
    result.current.setSearchTerm('이벤트 3');
  });

  expect(result.current.filteredEvents).toEqual([
    {
      id: '3',
      title: '이벤트 3',
      date: '2024-07-09',
      startTime: '13:00',
      endTime: '14:00',
      description: '점심',
      location: '강릉',
      category: '약속',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 10,
    },
  ]);

  act(() => {
    result.current.setSearchTerm('점심');
  });

  expect(result.current.filteredEvents).toEqual([
    {
      id: '3',
      title: '이벤트 3',
      date: '2024-07-09',
      startTime: '13:00',
      endTime: '14:00',
      description: '점심',
      location: '강릉',
      category: '약속',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 10,
    },
  ]);

  act(() => {
    result.current.setSearchTerm('강릉');
  });

  expect(result.current.filteredEvents).toEqual([
    {
      id: '3',
      title: '이벤트 3',
      date: '2024-07-09',
      startTime: '13:00',
      endTime: '14:00',
      description: '점심',
      location: '강릉',
      category: '약속',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 10,
    },
  ]);
});

it('현재 뷰(주간/월간)에 해당하는 이벤트만 반환해야 한다', () => {
  const { result: resultMonth } = renderHook(() =>
    useSearch(events, new Date('2024-07-01'), 'month')
  );
  const { result: resultWeek } = renderHook(() =>
    useSearch(events, new Date('2024-07-01'), 'week')
  );

  act(() => {
    resultMonth.current.setSearchTerm('이벤트 3');
    resultWeek.current.setSearchTerm('이벤트 3');
  });

  expect(resultMonth.current.filteredEvents).toEqual([
    {
      id: '3',
      title: '이벤트 3',
      date: '2024-07-09',
      startTime: '13:00',
      endTime: '14:00',
      description: '점심',
      location: '강릉',
      category: '약속',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 10,
    },
  ]);
  expect(resultWeek.current.filteredEvents).toEqual([]);
});

it("검색어를 '회의'에서 '점심'으로 변경하면 필터링된 결과가 즉시 업데이트되어야 한다", () => {
  const { result } = renderHook(() => useSearch(events, new Date('2024-08-01'), 'month'));

  act(() => {
    result.current.setSearchTerm('회의');
  });

  expect(result.current.filteredEvents).toEqual([
    {
      id: '5',
      title: 'event 5',
      date: '2024-08-30',
      startTime: '10:00',
      endTime: '11:00',
      description: '회의',
      location: '서울',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
  ]);

  act(() => {
    result.current.setSearchTerm('점심');
  });

  expect(result.current.filteredEvents).toEqual([]);
});
