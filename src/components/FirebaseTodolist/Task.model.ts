export interface TaskModel{
  id:string;
  title:string;
  douDate:number;
  priority:number;
  done:boolean;
}

export function getNewBaseTask() {
  return {title:'', priority:1, douDate: Date.now(), done:false};
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
