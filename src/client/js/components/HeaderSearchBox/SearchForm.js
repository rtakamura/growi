import React from 'react';

import FormGroup from 'react-bootstrap/es/FormGroup';
import Button from 'react-bootstrap/es/Button';
import InputGroup from 'react-bootstrap/es/InputGroup';

import SearchTypeahead from '../SearchTypeahead';


// Header.SearchForm
export default class SearchForm extends React.Component {

  constructor(props) {
    super(props);

    this.crowi = window.crowi; // FIXME

    this.state = {
      searchError: null,
    };

    this.onSearchError = this.onSearchError.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onSearchError(err) {
    this.setState({
      searchError: err,
    });
  }

  onChange(selected) {
    const page = selected[0];  // should be single page selected

    // navigate to page
    if (page != null) {
      window.location = page.path;
    }
  }

  getHelpElement() {
    return (
      <table className="table m-1 search-help">
        <caption className="text-left text-primary p-2 mb-2">
          <h5 className="m-1"><i className="icon-magnifier pr-2 mb-2"/>Search Help</h5>
        </caption>
        <tbody>
          <tr>
            <td className="text-right mt-0 pr-2 p-1"><code>keyword</code></td>
            <th className="mr-2"><h6 className="pr-2 m-0 pt-1">記事名 or 本文に<samp>"keyword"</samp>を含む</h6></th>
          </tr>
          <tr>
            <td className="text-right mt-0 pr-2 p-1"><code>a b</code></td>
            <th><h6 className="m-0 pt-1">文字列<samp>"a"</samp>と<samp>"b"</samp>を含む (スペース区切り)</h6></th>
          </tr>
          <tr>
            <td className="text-right mt-0 pr-2 p-1"><code>-keyword</code></td>
            <th><h6 className="m-0 pt-1">文字列<samp>"keyword"</samp>を含まない</h6></th>
          </tr>
        </tbody>
      </table>
    );
  }

  onSubmit(query) {
    this.refs.form.submit(query);
  }

  render() {
    const emptyLabel = (this.state.searchError !== null)
      ? 'Error on searching.'
      : 'No matches found on title... Hit [Enter] key so that search on contents.';

    return (
      <form
        ref='form'
        action='/_search'
        className='search-form form-group input-group search-input-group hidden-print'
      >
        <FormGroup>
          <InputGroup>
            <SearchTypeahead
              crowi={this.crowi}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              emptyLabel={emptyLabel}
              placeholder="Search ..."
              promptText={this.getHelpElement()}
            />
            <InputGroup.Button>
              <Button type="submit" bsStyle="link">
                <i className="icon-magnifier"></i>
              </Button >
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>

      </form>

    );
  }
}

SearchForm.propTypes = {
};

SearchForm.defaultProps = {
};
