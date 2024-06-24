export function setNextProcess(state, action) {
  const { processId, moduleId, chatProcessId, chatModuleId } = action;
  state.nextProcessId = processId;
  state.nextModuleId = moduleId;
  state.nextChatProcessId = chatProcessId;
  state.nextModuleId = chatModuleId;

  return { processId, moduleId, chatProcessId, chatModuleId };
}
