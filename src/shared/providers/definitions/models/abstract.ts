import OpenAICompatible from '../../../models/openai-compatible'

export default class Abstract extends OpenAICompatible {
  public name = 'Abstract'

  // /v1/models also lists background (:async) models that do not stream chat replies,
  // so only the built-in catalog is offered.
  public listModels() {
    return Promise.resolve([])
  }
}
