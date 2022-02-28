export interface TaskModel{
  id:number;
  title:string;
  douDate:number;
  priority:number;
  done:boolean;
}

export const sortTasks = (
  arr: TaskModel[],
  sortBy: 'douDate' | 'priority',
  order: 'asc' | 'desc'
) =>
  arr.sort(
    (
      a: TaskModel,
      b: TaskModel
    ) => (order === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy])
  );
