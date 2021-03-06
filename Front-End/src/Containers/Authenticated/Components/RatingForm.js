
import React from 'react';
import * as _ from 'lodash';
import t from 'tcomb-form';

import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';

const FormsLayout = locals => {
  const inputs = _.map(locals.inputs, (value, key) => value);
  return (
    <Form pad='none' plain={true}>
      <FormFields>
        <For each='item' of={inputs} index='i'>
          <div key={i} style={{ width: '600px', Height: '' }}>
            {item}
          </div>
        </For>
      </FormFields>

      { locals.config.footer }
    </Form>
  );
};

export class TextLayout extends t.form.Component {
  getTemplate() {
    return locals => {
      return (
        <FormField error={locals.error} label={locals.label}>
          <TextInput
            onDOMChange={e => locals.onChange(e.target.value)}
            value={locals.value}
            placeHolder={locals.config.placeholder || ''}
          />
        </FormField>
      );
    };
  }
}


export default FormsLayout;
