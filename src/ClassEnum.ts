import { EnumNotFound } from './exception'

export default abstract class ClassEnum<T> {
  private readonly value!: string

  constructor(value: string) {
    this.value = value
  }

  public static values<T>(): T[] {
    const enums = this.getEnums<T>()
    return Array.from(enums.values())
  }

  private static getEnums<T>(): Map<string, T> {
    const classEnums: Map<string, T> = new Map()

    for (const name of Object.getOwnPropertyNames(this)) {
      if (name === 'prototype') {
        continue
      }

      const descriptor = Object.getOwnPropertyDescriptor(this, name)
      if (!descriptor || !(descriptor.value instanceof this)) {
        continue
      }

      // @ts-ignore
      classEnums.set(name, descriptor.value)
    }

    return classEnums
  }

  public static valueOf<T>(value: string, defaultEnum: T | null = null): T {
    const enums = this.getEnums<T>()
    if (!enums.has(value)) {
      if (defaultEnum !== null) {
        return defaultEnum
      }
      throw new EnumNotFound(value)
    }
    return enums.get(value)!
  }

  public name(): string {
    return this.value
  }

  public equals(e: ClassEnum<T>) {
    return this === e && this.value === e.value
  }
}
