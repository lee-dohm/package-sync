declare module 'busy-signal' {
  export interface BusyMessage {
    /**
     * Clears the busy message.
     */
    dispose(): void

    /**
     * Sets the title of the busy message.
     */
    setTitle(title: string): void
  }

  export interface BusySignalOptions {
    /**
     * If set to `true`, the busy signal tooltip will be immediately revealed
     * when it first becomes visible (without explicit mouse interaction).
     */
    revealTooltip?: boolean
  }

  export interface BusySignalService {
    /**
     * Activates the busy signal.
     *
     * The title can be updated in the returned `BusyMessage` object and the signal can be
     * deactivated by calling `dispose` on the `BusyMessage` object.
     */
    reportBusy(title: string, options?: BusySignalOptions): BusyMessage
  }
}
