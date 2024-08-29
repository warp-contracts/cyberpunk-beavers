export function setNextProcess(state, action) {
  const { processId, moduleId } = action;
  state.nextProcessId = processId;
  state.nextModuleId = moduleId;

  return { processId, moduleId };
}
