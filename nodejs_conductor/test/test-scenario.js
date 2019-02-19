const test = require('tape');
const path = require('path');

const { Config, Scenario } = require('..')

const dnaValid = Config.dna(
    path.join(__dirname, "test-bundle.json"),
    'dna-valid'
)
const dnaInvalid = Config.dna(
    path.join(__dirname, "nonexistent-file.json"),
    'dna-invalid'
)

const agent = Config.agent("007")

const instanceValid = Config.instance(agent, dnaValid, 'valorie')
const instanceInvalid = Config.instance(agent, dnaInvalid, 'ingrid')

test('can run a scenario', t => {
    const scenario = new Scenario([instanceValid])
    scenario.run((stop, {valorie}) => {
        t.equal(valorie.agentId, "geQa11ADJKJpTAcwEI_o7A7HDgDWwKoFHPV4-Pj7DRWtqXFHzhjaAqTTYOQPsrtbsKfatOGxNHHVnaCBNKEBSTaSf0gh")
        t.end()
        stop()
    }).catch(t.fail)
})

test('scenario throws if conductor cannot start', t => {
    const scenario = new Scenario([instanceInvalid])
    scenario.run((stop, {ingrid}) => {
        t.fail('should have thrown exception')
    }).catch(err => {
        t.equal(String(err).indexOf('Error: unable to start conductor'), 0)
        t.end()
    })
})
