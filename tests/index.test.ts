import ClassEnum from '../src/ClassEnum'
import { EnumNotFound } from '../src/exception/ClassEnumException'

test('Enum simple reference matching', () => {
  // given
  class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal()
  }

  // when
  const dog = Animal.DOG

  // expected
  expect(dog).toEqual(Animal.DOG)
})

test('Enum simple reference matching with title', () => {
  // given
  class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('dog')

    private readonly title!: string

    public constructor(title: string) {
      super()
      this.title = title
    }
  }

  // when
  const dog = Animal.DOG

  // expected
  expect(dog).toEqual(Animal.DOG)
})

test('The count of ClassEnum types', () => {
  // given
  class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('dog')
    public static readonly CAT = new Animal('cat')

    private readonly title!: string

    public constructor(title: string) {
      super()
      this.title = title
    }
  }

  // when
  const animals = Animal.values()

  // expected
  expect(animals.length).toBe(2)
})

test('The values contains all values', () => {
  // given
  class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('dog')
    public static readonly CAT = new Animal('cat')

    private readonly title!: string

    public constructor(title: string) {
      super()
      this.title = title
    }
  }

  // when
  const animals = Animal.values()

  // expected
  expect(animals[0]).toBe(Animal.DOG)
  expect(animals[1]).toBe(Animal.CAT)
})

test('Collects only ClassEnum types', () => {
  // given
  class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('dog')
    public static readonly CAT = new Animal('cat')
    public static readonly OTHER = 1

    private readonly title!: string

    public constructor(title: string) {
      super()
      this.title = title
    }
  }

  // when
  const animals = Animal.values()

  // expected
  expect(animals.length).toBe(2)
})

test('Collects only same types of ClassEnum', () => {
  // given
  class Other extends ClassEnum<Other> {
    public static readonly OTHER = new Other('other')

    private readonly title!: string

    public constructor(title: string) {
      super()
      this.title = title
    }
  }

  class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('dog')
    public static readonly CAT = new Animal('cat')

    private readonly title!: string

    public constructor(title: string) {
      super()
      this.title = title
    }
  }

  // when
  const animals = Animal.values()

  // expected
  expect(animals.length).toBe(2)
})

test("The dog-enum can't be cat-enum", () => {
  // given
  class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('dog')
    public static readonly CAT = new Animal('cat')

    private readonly title!: string

    public constructor(title: string) {
      super()
      this.title = title
    }
  }

  // when
  const dog = Animal.valueOf('DOG')

  // expected
  expect(dog).not.toEqual(Animal.CAT)
})

test('If the enum is not found, error occurs', () => {
  // given
  class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('dog')
    public static readonly CAT = new Animal('cat')

    private readonly title!: string

    public constructor(title: string) {
      super()
      this.title = title
    }
  }

  // when
  const mouse = () => {
    Animal.valueOf('MOUSE')
  }

  // expected
  expect(mouse).toThrow(EnumNotFound)
})