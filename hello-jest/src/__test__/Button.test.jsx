jest.unmock('../Button')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Button from '../Button'

describe('Button', () => {
  let props = {
    labelText: "hoge",
    onClick: jest.fn()
  }

  function setup() {
    const instance = TestUtils.renderIntoDocument(
      <Button {...props} />
    )
    const buttonNode = ReactDOM.findDOMNode(instance)
    return {
      instance,
      buttonNode
    }
  }

  describe('click', () => {
    it('calls onClick props', () => {
      const { buttonNode } = setup()

      TestUtils.Simulate.click(buttonNode)
      expect(props.onClick).toBeCalled()
    })
  })

  describe('value', () => {
    it('should be equal to label props', () => {
      props.labelText = "foo"
      const { buttonNode } = setup()

      expect(buttonNode.value).toEqual("foo")
    })
  })

  describe('disabled', () => {
    it('shoudl be false by default', () => {
      const { buttonNode } = setup()
      expect(buttonNode.disabled).toBeFalsy()
    })

    it('should be equal to disabled props', () => {
      props.disabled = true
      const { buttonNode } = setup()

      expect(buttonNode.disabled).toBeTruthy()
    })
  })
})
