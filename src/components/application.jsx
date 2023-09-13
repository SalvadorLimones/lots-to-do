import { useDeferredValue, useMemo } from 'react';
import { initialFilters } from '../features/filters';
import useFilters, { filterTasks } from '../lib/filter-tasks';
import useTasks from '../lib/use-tasks';
import Filters from './filters';
import Tasks from './tasks';

const Application = () => {
  const [tasks] = useTasks();
  const [filters, setFilter] = useFilters(initialFilters);
 const  deferedFilters = useDeferredValue(filters)


  const visibleTasks = useMemo(
    () => filterTasks(tasks, deferedFilters),
    [tasks, deferedFilters],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
      setFilter(name, value);
  };


  return (
    <main>
      <Filters filters={filters} onChange={handleChange} />
      {deferedFilters !== filters && <p>Loading</p>}
      <Tasks tasks={visibleTasks} />
    </main>
  );
};

export default Application;
