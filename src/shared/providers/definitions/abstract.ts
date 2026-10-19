import { ModelProviderEnum, ModelProviderType } from '../../types'
import { defineProvider } from '../registry'
import Abstract from './models/abstract'

const ABSTRACT_API_HOST = 'https://api.abstract.inc/v1'

export const abstractProvider = defineProvider({
  id: ModelProviderEnum.Abstract,
  name: 'Abstract',
  type: ModelProviderType.OpenAI,
  urls: {
    website: 'https://abstract.inc',
    apiKey: 'https://platform.abstract.inc/keys',
    docs: 'https://abstract.inc/docs',
  },
  defaultSettings: {
    apiHost: ABSTRACT_API_HOST,
    models: [
      {
        modelId: 'glm-5.3:superfast',
        nickname: 'GLM-5.3',
        contextWindow: 262_144,
        maxOutput: 65_536,
      },
      {
        modelId: 'deepseek-v4-flash:superfast',
        nickname: 'DeepSeek-V4-Flash',
        contextWindow: 262_144,
        maxOutput: 65_536,
      },
      {
        modelId: 'kimi-k3:superfast',
        nickname: 'Kimi-K3',
        contextWindow: 262_144,
        maxOutput: 65_536,
      },
    ],
  },
  createModel: (config) => {
    return new Abstract(
      {
        apiKey: config.effectiveApiKey,
        apiHost: config.formattedApiHost || ABSTRACT_API_HOST,
        model: config.model,
        temperature: config.settings.temperature,
        topP: config.settings.topP,
        maxOutputTokens: config.settings.maxTokens,
        stream: config.settings.stream,
        useProxy: config.providerSetting.useProxy,
      },
      config.dependencies
    )
  },
  getDisplayName: (modelId, providerSettings) => {
    return `Abstract (${providerSettings?.models?.find((m) => m.modelId === modelId)?.nickname || modelId})`
  },
})
